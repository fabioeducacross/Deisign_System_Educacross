import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  try {
    console.log('🖼️  Gerando og-image.png...');
    
    const svgPath = join(__dirname, '../public/og-image.svg');
    const outputPath = join(__dirname, '../public/og-image.png');
    
    const svgBuffer = readFileSync(svgPath);
    
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(outputPath);
    
    console.log('✅ og-image.png criado com sucesso!');
    console.log(`   📍 ${outputPath}`);
  } catch (error) {
    console.error('❌ Erro ao gerar og-image.png:', error);
    process.exit(1);
  }
}

generateOGImage();
