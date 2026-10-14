import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";

export function Gallery({ onView }: { onView: (index: number) => void }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="mx-auto max-w-5xl">
      <div className="gallery-window overflow-hidden" role="region" aria-label="Couple photos">
        <div className={`gallery-track ${paused ? "is-paused" : ""}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="gallery-group" aria-hidden={copy === 1 ? true : undefined}>
              {wedding.gallery.map((photo, index) => (
                <Button key={photo.src} variant="ghost" tabIndex={copy === 1 ? -1 : 0}
                  onClick={() => onView(index)} aria-label={`View photo: ${photo.alt}`}
                  className="gallery-photo group h-auto rounded-none p-0">
                  <img src={photo.src} alt={copy === 1 ? "" : photo.alt} width={photo.w} height={photo.h}
                    loading="lazy" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center motion-reduce:hidden">
        <Button variant="ghost" size="icon" aria-label={paused ? "Resume photo movement" : "Pause photo movement"}
          title={paused ? "Resume photo movement" : "Pause photo movement"} aria-pressed={paused}
          onClick={() => setPaused((value) => !value)} className="text-wine">
          {paused ? <Play /> : <Pause />}
        </Button>
      </div>
    </div>
  );
}