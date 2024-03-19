'use client';
import React, { FC, useLayoutEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { text, curve, translate } from './anim';
import styles from './curve.module.scss';
import { CommonProps } from '@/shared';

export interface WindowDimensions {
  width: number | null;
  height: number | null;
}

const anim = (variants: Variants) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  };
};

export const Curve: FC<CommonProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: null,
    height: null,
  });

  useLayoutEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`${styles.curve} page`}>
      <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className={styles.background} />
      <motion.p className={styles.route} {...anim(text)}>
        ТОП ВЫБОР
      </motion.p>
      {dimensions.width != null && (
        // @ts-ignore
        <SVG {...dimensions} />
      )}
      {children}
    </div>
  );
};

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg className={styles.slide} {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
