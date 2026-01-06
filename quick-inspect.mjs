import { chromium } from 'playwright';
import fs from 'fs';

async function quickInspect() {
    const report = [];
    const log = (msg) => {
        console.log(msg);
        report.push(msg);
    };

    log('🔍 Inspeção Rápida do Avatar\n');
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    try {
        await page.goto('http://localhost:6006/?path=/story/layout-header--default', {
            waitUntil: 'networkidle',
            timeout: 10000
        });
        
        await page.waitForTimeout(2000);

        const frame = page.frameLocator('#storybook-preview-iframe');
        
        // Verificar Avatar
        const avatarIcon = frame.locator('img[alt="Avatar Educacross"]');
        const count = await avatarIcon.count();
        
        log(`✓ AvatarIcon encontrado: ${count > 0 ? 'SIM' : 'NÃO'}`);
        
        if (count > 0) {
            const src = await avatarIcon.getAttribute('src');
            const visible = await avatarIcon.isVisible();
            
            log(`  - Src: ${src}`);
            log(`  - Visível: ${visible}`);
            
            try {
                const naturalWidth = await avatarIcon.evaluate(img => img.naturalWidth);
                const naturalHeight = await avatarIcon.evaluate(img => img.naturalHeight);
                log(`  - Dimensões: ${naturalWidth}x${naturalHeight}`);
                log(`  - Status: ${naturalWidth === 0 ? '❌ NÃO CARREGOU' : '✅ CARREGOU'}`);
            } catch (e) {
                log(`  - Erro ao verificar dimensões: ${e.message}`);
            }
        }

        // Verificar se Avatar.svg existe
        log('\n📁 Verificando arquivo Avatar.svg...');
        const avatarSvgExists = fs.existsSync('./packages/ui/src/assets/Icons/Avatar.svg');
        log(`  - Avatar.svg existe: ${avatarSvgExists ? 'SIM' : 'NÃO'}`);
        
        if (!avatarSvgExists) {
            log('  ⚠️  PROBLEMA ENCONTRADO: arquivo Avatar.svg não existe!');
            // Listar arquivos no diretório
            try {
                const files = fs.readdirSync('./packages/ui/src/assets/Icons');
                log(`  - Arquivos em Icons/: ${files.join(', ')}`);
            } catch (e) {
                log(`  - Erro ao listar: ${e.message}`);
            }
        }

        if (errors.length > 0) {
            log('\n❌ Erros de Console:');
            errors.forEach(err => log(`  - ${err}`));
        }

        await page.screenshot({ path: 'quick-inspect.png' });
        log('\n📸 Screenshot salvo: quick-inspect.png');

    } catch (error) {
        log(`\n❌ Erro: ${error.message}`);
    } finally {
        await browser.close();
    }

    // Salvar relatório
    fs.writeFileSync('inspect-report.txt', report.join('\n'));
    log('\n📄 Relatório salvo: inspect-report.txt');
}

quickInspect().catch(console.error);
