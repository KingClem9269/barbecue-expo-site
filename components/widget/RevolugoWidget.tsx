// app/components/RevolugoWidget.tsx
"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export default function RevolugoWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After script loads, check if widget was appended to body and move it to our container
    const moveWidgetToContainer = () => {
      if (!containerRef.current) return;

      // Look for the widget element (might be an iframe or div created by the script)
      // The script might create elements with specific attributes or classes
      const widgetElements = document.querySelectorAll(
        'iframe[src*="revolugo"], div[data-revolugo], [id*="revolugo"]'
      );

      widgetElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Skip if element is already in our container
        if (containerRef.current?.contains(htmlElement)) {
          return;
        }
        
        // Skip if our container is inside the element (would cause circular reference)
        if (htmlElement.contains(containerRef.current)) {
          return;
        }
        
        // Skip if element is the container itself
        if (htmlElement === containerRef.current) {
          return;
        }
        
        // Only move if element has a parent and it's not our container
        if (
          htmlElement.parentElement &&
          htmlElement.parentElement !== containerRef.current &&
          containerRef.current
        ) {
          // Move widget to our container
          containerRef.current.appendChild(htmlElement);
        }
      });
    };

    // Check periodically after a delay to catch dynamically created elements
    const interval = setInterval(moveWidgetToContainer, 100);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={containerRef} id="revolugo-widget-container">
      <Script
        id="revolugo-widget"
        src="https://widget.revolugo.com/embed"
        data-wid="salon-du-barbecue-2026"
        strategy="afterInteractive"
        onLoad={() => {
          // Script loaded, widget should render soon
          setTimeout(() => {
            if (containerRef.current) {
              const widgetElements = document.querySelectorAll(
                'iframe[src*="revolugo"], div[data-revolugo], [id*="revolugo"]'
              );
              widgetElements.forEach((element) => {
                const htmlElement = element as HTMLElement;
                
                // Skip if element is already in our container
                if (containerRef.current?.contains(htmlElement)) {
                  return;
                }
                
                // Skip if our container is inside the element (would cause circular reference)
                if (htmlElement.contains(containerRef.current)) {
                  return;
                }
                
                // Skip if element is the container itself
                if (htmlElement === containerRef.current) {
                  return;
                }
                
                // Only move if element has a parent and it's not our container
                if (
                  htmlElement.parentElement &&
                  htmlElement.parentElement !== containerRef.current &&
                  containerRef.current
                ) {
                  containerRef.current.appendChild(htmlElement);
                }
              });
            }
          }, 500);
        }}
      />
    </div>
  );
}
