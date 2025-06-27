import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFile } from 'fs/promises';

// サイト自体のOGP画像
const generateOgpImage = async () => {
  const fontData = await readFile(new URL('../assets/fonts/NotoSansJP-Medium.ttf', import.meta.url));
  const bgData = await readFile(new URL('../assets/images/ogp.jpg', import.meta.url));
  const iconData = await readFile(new URL('../assets/images/icon.png', import.meta.url));
  const bgBase64 = `data:image/jpeg;base64,${bgData.toString('base64')}`;
  const iconBase64 = `data:image/png;base64,${iconData.toString('base64')}`;

  const element = (
    <div style={{
      width: '2400px',
      height: '1260px',
      backgroundImage: `url(${bgBase64})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Noto Sans JP',
    }}>
      <div style={{
        width: '2280px',
        height: '1140px',
        borderRadius: '24px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{
          fontSize: '180px',
          lineHeight: 1.4,
          color: '#111',
          display: 'flex',
        }}>
          <img
            src={iconBase64}
            alt="Logo"
            style={{
              width: '246px',
              marginRight: '24px',
            }}
          />
          ky0ta168's blog
        </h1>
      </div>
    </div>
  );

  const svg = await satori(element, {
    width: 2400,
    height: 1260,
    fonts: [{
      name: 'Noto Sans JP',
      data: fontData,
      style: 'normal',
    }],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 2400 },
  });
  const pngBufferHighRes = resvg.render().asPng();

  const pngBufferOg = await sharp(pngBufferHighRes)
    .resize(1200, 630)
    .png()
    .toBuffer();

  return pngBufferOg;
};

export const generateSiteOgpImage = () => {
  return generateOgpImage();
};

// ブログ記事ごとのOGP画像
const generatePostOgpImage = async (title: string) => {
  const fontData = await readFile(new URL('../assets/fonts/NotoSansJP-Medium.ttf', import.meta.url));
  const bgData = await readFile(new URL('../assets/images/ogp.jpg', import.meta.url));
  const iconData = await readFile(new URL('../assets/images/icon.png', import.meta.url));
  const bgBase64 = `data:image/jpeg;base64,${bgData.toString('base64')}`;
  const iconBase64 = `data:image/png;base64,${iconData.toString('base64')}`;

  const element = (
    <div style={{
      width: '2400px',
      height: '1260px',
      backgroundImage: `url(${bgBase64})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Noto Sans JP',
    }}>
      <div style={{
        width: '2280px',
        height: '1140px',
        borderRadius: '24px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{
          fontSize: '112px',
          lineHeight: 1.4,
          color: '#111',
          display: 'flex',
          textAlign: 'center',
          padding: '0 140px',
        }}>
          {title}
        </h1>
        <h2 style={{
          fontSize: '80px',
          lineHeight: 1.4,
          color: '#111',
          display: 'flex',
          textAlign: 'center',
        }}>
          <img
            src={iconBase64}
            alt="Logo"
            style={{
              width: '112px',
              marginRight: '18px',
            }}
          />
          ky0ta168' blog
        </h2>
      </div>
    </div>
  );

  const svg = await satori(element, {
    width: 2400,
    height: 1260,
    fonts: [{
      name: 'Noto Sans JP',
      data: fontData,
      style: 'normal',
    }],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 2400 },
  });
  const pngBufferHighRes = resvg.render().asPng();

  const pngBufferOg = await sharp(pngBufferHighRes)
    .resize(1200, 630)
    .png()
    .toBuffer();

  return pngBufferOg;
};

export const generateBlogPostOgpImage = (title: string) => {
  return generatePostOgpImage(title);
}
