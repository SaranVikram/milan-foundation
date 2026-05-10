"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 65 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on
     * the size of the text and viewport. For now, we are hardcoding it.
     */
    return (
        <div className="parallax overflow-hidden tracking-tighter leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className="text-[#000] scroller font-semibold uppercase text-5xl md:text-7xl lg:text-9xl flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-12 md:mr-24">{children}</span>
                <span className="block mr-12 md:mr-24">{children}</span>
                <span className="block mr-12 md:mr-24">{children}</span>
                <span className="block mr-12 md:mr-24">{children}</span>
            </motion.div>
        </div>
    );
}

const BrandScroll = ({ brandName }: { brandName: string }) => {
    return (
        <section className=" overflow-hidden">
            <ParallaxText baseVelocity={2}>
                Your Company <span className="text-3xl md:text-5xl lg:text-7xl align-middle mx-4 lowercase">x</span> {brandName}
            </ParallaxText>
        </section>
    );
};

export default BrandScroll;
