/**
 * Pipeline animé : frames PNG → GIF (stories/DM) + MP4 H.264 (feed/reels).
 * Utilise le binaire ffmpeg-static (aucun ffmpeg système requis).
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const run = promisify(execFile);

/** Encode une suite de frames PNG en .mp4 et .gif (mêmes dimensions). */
export async function encodeAnimation(
  frames: Buffer[],
  outBase: string, // chemin sans extension
  opts: { fps?: number } = {},
): Promise<{ mp4: string; gif: string }> {
  if (!ffmpegPath) throw new Error("ffmpeg-static introuvable");
  const fps = opts.fps ?? 30;
  const dir = await mkdtemp(path.join(tmpdir(), "bbq-frames-"));
  try {
    await Promise.all(
      frames.map((f, i) =>
        writeFile(path.join(dir, `f-${String(i).padStart(4, "0")}.png`), f),
      ),
    );
    const pattern = path.join(dir, "f-%04d.png");
    const mp4 = `${outBase}.mp4`;
    const gif = `${outBase}.gif`;

    // MP4 — H.264, yuv420p (compatibilité), faststart (lecture immédiate)
    await run(ffmpegPath, [
      "-y", "-framerate", String(fps), "-i", pattern,
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", mp4,
    ]);

    // GIF — palette 2 passes (palettegen/paletteuse), boucle infinie
    const palette = path.join(dir, "palette.png");
    await run(ffmpegPath, [
      "-y", "-framerate", String(fps), "-i", pattern,
      "-vf", `fps=${fps},palettegen=stats_mode=diff`, palette,
    ]);
    await run(ffmpegPath, [
      "-y", "-framerate", String(fps), "-i", pattern, "-i", palette,
      "-lavfi", `fps=${fps}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3`,
      "-loop", "0", gif,
    ]);

    return { mp4, gif };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
