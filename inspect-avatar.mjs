import { chromium } from 'playwright';

async function inspectAvatar() {
    console.log('🔍 Iniciando inspeção do avatar no Storybook...\n');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Coletar erros de console
    const consoleMessages = [];
    const errors = [];
    
    page.on('console', msg => {
        const text = msg.text();
        consoleMessages.push({ type: msg.type(), text });
        if (msg.type() === 'error') {
            console.log(`❌ Console Error: ${text}`);
        }
    });

    page.on('pageerror', error => {
        errors.push(error.message);
        console.log(`❌ Page Error: ${error.message}`);
    });

    try {
        // Navegar para o Storybook
        console.log('📂 Navegando para o Storybook...');
        await page.goto('http://localhost:6006', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Navegar para a story do Header
        console.log('📖 Navegando para a story do Header...');
        await page.click('text=Layout');
        await page.waitForTimeout(500);
        await page.click('text=Header');
        await page.waitForTimeout(1000);

        // Buscar o iframe do Storybook
        const frame = page.frameLocator('#storybook-preview-iframe');
        
        console.log('\n🔎 Inspecionando elementos do Header...\n');

        // Verificar se o Header existe
        const header = frame.locator('header');
        const headerExists = await header.count() > 0;
        console.log(`✓ Header encontrado: ${headerExists}`);

        // Verificar o Logo
        const logo = frame.locator('img[alt="Educacross"]');
        const logoExists = await logo.count() > 0;
        console.log(`✓ Logo encontrado: ${logoExists}`);
        if (logoExists) {
            const logoSrc = await logo.getAttribute('src');
            console.log(`  → Src do logo: ${logoSrc}`);
        }

        // Verificar o Avatar
        const avatarContainer = frame.locator('span[class*="rounded-full"]');
        const avatarExists = await avatarContainer.count() > 0;
        console.log(`✓ Container do Avatar encontrado: ${avatarExists}`);

        // Verificar AvatarImage
        const avatarImage = frame.locator('img[alt*="Afonso"], img[alt*="Avatar"]');
        const avatarImageCount = await avatarImage.count();
        console.log(`✓ Imagens de Avatar encontradas: ${avatarImageCount}`);
        
        if (avatarImageCount > 0) {
            for (let i = 0; i < avatarImageCount; i++) {
                const img = avatarImage.nth(i);
                const alt = await img.getAttribute('alt');
                const src = await img.getAttribute('src');
                const isVisible = await img.isVisible();
                console.log(`  → Avatar ${i + 1}:`);
                console.log(`    - Alt: ${alt}`);
                console.log(`    - Src: ${src}`);
                console.log(`    - Visível: ${isVisible}`);
            }
        }

        // Verificar AvatarFallback
        const fallback = frame.locator('span[class*="rounded-full"] > span');
        const fallbackCount = await fallback.count();
        console.log(`✓ AvatarFallback encontrado: ${fallbackCount > 0}`);
        
        if (fallbackCount > 0) {
            const fallbackText = await fallback.first().textContent();
            const fallbackClasses = await fallback.first().getAttribute('class');
            console.log(`  → Conteúdo do fallback: "${fallbackText}"`);
            console.log(`  → Classes: ${fallbackClasses}`);

            // Verificar se tem AvatarIcon dentro
            const avatarIcon = fallback.locator('img[alt="Avatar Educacross"]');
            const hasIcon = await avatarIcon.count() > 0;
            console.log(`  → Tem AvatarIcon: ${hasIcon}`);
            
            if (hasIcon) {
                const iconSrc = await avatarIcon.getAttribute('src');
                const iconVisible = await avatarIcon.isVisible();
                console.log(`    - Src do ícone: ${iconSrc}`);
                console.log(`    - Visível: ${iconVisible}`);
                
                // Verificar se a imagem carregou com erro
                const naturalWidth = await avatarIcon.evaluate(img => img.naturalWidth);
                const naturalHeight = await avatarIcon.evaluate(img => img.naturalHeight);
                console.log(`    - Dimensões naturais: ${naturalWidth}x${naturalHeight}`);
                console.log(`    - ${naturalWidth === 0 ? '⚠️  IMAGEM NÃO CARREGOU!' : '✅ Imagem carregada com sucesso'}`);
            }
        }

        // Verificar SVG inline
        const svgElements = frame.locator('svg');
        const svgCount = await svgElements.count();
        console.log(`\n✓ SVGs encontrados no iframe: ${svgCount}`);

        // Capturar screenshot
        console.log('\n📸 Capturando screenshot...');
        await page.screenshot({ path: 'storybook-header-inspect.png', fullPage: true });
        console.log('✓ Screenshot salvo como: storybook-header-inspect.png');

        // Capturar screenshot apenas do iframe
        const iframeElement = await page.$('#storybook-preview-iframe');
        if (iframeElement) {
            await iframeElement.screenshot({ path: 'storybook-header-iframe.png' });
            console.log('✓ Screenshot do iframe salvo como: storybook-header-iframe.png');
        }

        // Resumo de erros
        console.log('\n📋 Resumo:');
        console.log(`  - Erros de console: ${consoleMessages.filter(m => m.type === 'error').length}`);
        console.log(`  - Erros de página: ${errors.length}`);

        if (consoleMessages.filter(m => m.type === 'error').length > 0) {
            console.log('\n❌ Erros encontrados:');
            consoleMessages
                .filter(m => m.type === 'error')
                .forEach(m => console.log(`  - ${m.text}`));
        }

        // Aguardar para inspeção manual
        console.log('\n⏸️  Aguardando 30 segundos para inspeção manual...');
        console.log('   (O navegador permanecerá aberto)');
        await page.waitForTimeout(30000);

    } catch (error) {
        console.error('\n❌ Erro durante a inspeção:', error.message);
    } finally {
        await browser.close();
        console.log('\n✅ Inspeção concluída!');
    }
}

inspectAvatar().catch(console.error);
