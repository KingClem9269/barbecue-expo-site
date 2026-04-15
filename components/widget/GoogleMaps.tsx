"use client";

export default function GoogleMapsMap() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.23784465838!2d2.4441406765771685!3d48.834601771329005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e672b79d97cd0b%3A0xd87d5287ecb38b11!2sArea%20Events%20-%20Parc%20Floral%20de%20Paris!5e0!3m2!1sen!2sfr!4v1769265887316!5m2!1sen!2sfr"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
