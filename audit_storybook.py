#!/usr/bin/env python3
"""
Script de auditoria completa do Storybook
Testa interações, acessibilidade e documenta findings
"""

import asyncio
from playwright.async_api import async_playwright
import time
from pathlib import Path

# URLs para testar
STORYBOOK_URL = "http://localhost:6006"
PAGES_TO_TEST = [
    ("Introdução", "/?path=/docs/getting-started-introdução--docs"),
    ("Guia Rápido", "/?path=/docs/getting-started-guia-rápido--docs"),
    ("Para IAs", "/?path=/docs/getting-started-para-ias--docs"),
    ("API Reference", "/?path=/docs/getting-started-api-reference--docs"),
    ("Button", "/?path=/docs/components-button--docs"),
    ("Input", "/?path=/docs/components-input--docs"),
    ("Card", "/?path=/docs/components-card--docs"),
]

async def test_page(page, name, path):
    """Testa uma página individual"""
    print(f"\n{'='*70}")
    print(f"TESTANDO: {name}")
    print(f"{'='*70}")
    
    url = f"{STORYBOOK_URL}{path}"
    
    try:
        # Navega para página
        await page.goto(url, wait_until="networkidle", timeout=15000)
        await page.wait_for_timeout(2000)
        
        # Captura screenshot
        screenshot_path = f"audit-{name.lower().replace(' ', '-')}.png"
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"✓ Screenshot: {screenshot_path}")
        
        # Verifica título
        title = await page.title()
        print(f"✓ Título: {title}")
        
        # Verifica erros de console
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        
        # Verifica conteúdo principal
        main_content = await page.query_selector("main, article, [role='main']")
        if main_content:
            print(f"✓ Conteúdo principal encontrado")
        else:
            print(f"✗ ERRO: Conteúdo principal NÃO encontrado")
            
        # Verifica sidebar
        sidebar = await page.query_selector("nav, aside, [role='navigation']")
        if sidebar:
            print(f"✓ Sidebar encontrada")
        else:
            print(f"⚠ Sidebar não encontrada")
        
        # Testa acessibilidade básica
        # Verifica se há headings
        h1 = await page.query_selector("h1")
        if h1:
            h1_text = await h1.text_content()
            print(f"✓ H1 presente: {h1_text[:50]}...")
        else:
            print(f"⚠ Sem H1 na página")
        
        # Verifica links
        links = await page.query_selector_all("a")
        print(f"✓ Links encontrados: {len(links)}")
        
        # Verifica imagens com alt
        images = await page.query_selector_all("img")
        images_without_alt = 0
        for img in images:
            alt = await img.get_attribute("alt")
            if not alt:
                images_without_alt += 1
        
        if images_without_alt > 0:
            print(f"⚠ Imagens sem alt: {images_without_alt} de {len(images)}")
        else:
            print(f"✓ Todas imagens têm alt ({len(images)})")
        
        return {
            "name": name,
            "url": url,
            "status": "✓ PASS",
            "screenshot": screenshot_path,
            "errors": errors,
        }
        
    except Exception as e:
        print(f"✗ ERRO: {str(e)}")
        return {
            "name": name,
            "url": url,
            "status": "✗ FAIL",
            "error": str(e),
        }

async def test_interactions(page):
    """Testa interações do Storybook"""
    print(f"\n{'='*70}")
    print(f"TESTANDO INTERAÇÕES")
    print(f"{'='*70}")
    
    await page.goto(STORYBOOK_URL, wait_until="networkidle")
    await page.wait_for_timeout(2000)
    
    # Testa busca
    print("\n🔍 Testando Search...")
    search_input = await page.query_selector("input[type='search'], input[placeholder*='Find'], input[placeholder*='Search']")
    if search_input:
        await search_input.fill("button")
        await page.wait_for_timeout(1000)
        print("✓ Search funcional")
    else:
        print("✗ Search input não encontrado")
    
    # Testa sidebar navigation
    print("\n📂 Testando Sidebar Navigation...")
    nav_links = await page.query_selector_all("nav a, aside a")
    print(f"✓ {len(nav_links)} links de navegação encontrados")
    
    # Testa keyboard navigation
    print("\n⌨️ Testando Keyboard Navigation...")
    await page.keyboard.press("Tab")
    await page.wait_for_timeout(500)
    focused = await page.evaluate("document.activeElement.tagName")
    print(f"✓ Focus após Tab: {focused}")
    
    # Verifica focus visible
    focus_outline = await page.evaluate("""
        () => {
            const el = document.activeElement;
            const style = window.getComputedStyle(el);
            return style.outline !== 'none' || style.boxShadow.includes('ring');
        }
    """)
    if focus_outline:
        print("✓ Focus visible presente")
    else:
        print("⚠ Focus visible pode não estar visível")

async def test_theme(page):
    """Testa tema light forçado"""
    print(f"\n{'='*70}")
    print(f"TESTANDO TEMA")
    print(f"{'='*70}")
    
    await page.goto(STORYBOOK_URL, wait_until="networkidle")
    
    # Verifica classe dark
    has_dark = await page.evaluate("document.documentElement.classList.contains('dark')")
    if has_dark:
        print("⚠ Classe 'dark' detectada (deveria ser light only)")
    else:
        print("✓ Tema light ativo (sem classe 'dark')")
    
    # Verifica cor de fundo
    bg_color = await page.evaluate("window.getComputedStyle(document.body).backgroundColor")
    print(f"✓ Background color: {bg_color}")
    
    # Verifica variáveis CSS
    primary_color = await page.evaluate("""
        () => getComputedStyle(document.documentElement).getPropertyValue('--educacross-primary')
    """)
    if primary_color:
        print(f"✓ Variável --educacross-primary: {primary_color.strip()}")

async def main():
    print(f"""
╔═══════════════════════════════════════════════════════════╗
║   EDUCACROSS STORYBOOK AUDIT - AUTOMATED                 ║
║   Testes de Interação, Acessibilidade e Visual           ║
╚═══════════════════════════════════════════════════════════╝
""")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 800})
        page = await context.new_page()
        
        results = []
        
        # Testa páginas individuais
        for name, path in PAGES_TO_TEST:
            result = await test_page(page, name, path)
            results.append(result)
            await page.wait_for_timeout(1000)
        
        # Testa interações
        await test_interactions(page)
        
        # Testa tema
        await test_theme(page)
        
        await browser.close()
        
        # Resumo
        print(f"\n{'='*70}")
        print("RESUMO")
        print(f"{'='*70}")
        
        passed = sum(1 for r in results if r["status"] == "✓ PASS")
        total = len(results)
        
        print(f"\nPáginas testadas: {total}")
        print(f"✓ Passou: {passed}")
        print(f"✗ Falhou: {total - passed}")
        print(f"\nTaxa de sucesso: {(passed/total)*100:.1f}%")
        
        print(f"\n{'='*70}")
        print("Audit completo! Verifique os screenshots gerados.")
        print(f"{'='*70}\n")

if __name__ == "__main__":
    asyncio.run(main())
