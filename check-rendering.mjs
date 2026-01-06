import { chromium } from 'playwright';

async function checkRendering() {
    console.log('🔍 Iniciando verificação do Storybook...');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        // Navegar para a story do Header
        console.log('📖 Abrindo story do Header...');
        await page.goto('http://localhost:6006/iframe.html?viewMode=story&id=layout-header--default', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        // Aguardar um pouco para renderização
        await page.waitForTimeout(2000);
        
        // Verificar se o header foi renderizado
        const header = await page.locator('header').count();
        console.log(`✅ Header encontrado: ${header > 0 ? 'SIM' : 'NÃO'}`);
        
        // Verificar se o SVG do AvatarIcon está presente
        const svg = await page.locator('svg[viewBox="0 0 42 42"]').count();
        console.log(`🎨 AvatarIcon SVG encontrado: ${svg > 0 ? 'SIM' : 'NÃO'}`);
        
        // Verificar a cor do fundo do SVG
        if (svg > 0) {
            const rect = await page.locator('svg[viewBox="0 0 42 42"] rect[fill="#00CFE8"]').count();
            console.log(`🔵 Círculo cyan encontrado: ${rect > 0 ? 'SIM' : 'NÃO'}`);
        }
        
        // Capturar screenshot
        await page.screenshot({ path: 'header-render-check.png', fullPage: true });
        console.log('📸 Screenshot salvo em: header-render-check.png');
        
        // Esperar 10 segundos para inspeção manual
        console.log('\n⏱️  Aguardando 10 segundos para você inspecionar manualmente...');
        await page.waitForTimeout(10000);
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await browser.close();
    }
}

checkRendering();
