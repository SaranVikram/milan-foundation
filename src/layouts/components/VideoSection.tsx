import React from "react";
import Youtube from "../shortcodes/Youtube";
import { SectionHeading } from "../shortcodes/SectionHeading";

interface VideoSectionProps {
    videoId: string;
    title: string;
    sectionTitle: string;
    description?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
    videoId,
    title,
    sectionTitle,
    description,
}) => {
    return (
        <section className="section bg-theme-light">
            <div className="container">
                <SectionHeading text={sectionTitle} />
                {description && (
                    <p className="mb-8 text-center text-lg text-text-light mx-auto max-w-2xl">
                        {description}
                    </p>
                )}
                <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl transition-all hover:scale-[1.01]">
                    <Youtube id={videoId} title={title} />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
