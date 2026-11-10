const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const products = {
  purMyEssence: { id:'purMyEssence', name:'Pur Blanca My Essence', code:'135893', category:'Perfumaria Avon', price:49.99, shape:'bottle', c1:'#e9aeb5', c2:'#f8e2e4', cap:'#b68056', description:'Deo Colônia 75 ml. Floral madeira com peônia-rosa. Oferta do ciclo: de R$ 74,90 por R$ 49,99.' },
  purBlanca: { id:'purBlanca', name:'Pur Blanca', code:'135889', category:'Perfumaria Avon', price:49.99, shape:'bottle', c1:'#bad8db', c2:'#edf8f7', cap:'#91979b', description:'Deo Colônia 75 ml. Floral madeira com frésia. Oferta do ciclo: de R$ 74,90 por R$ 49,99.' },
  purHope: { id:'purHope', name:'Pur Blanca Hope', code:'135892', category:'Perfumaria Avon', price:49.99, shape:'bottle', c1:'#c9d19b', c2:'#f1f4de', cap:'#979b99', description:'Deo Colônia 75 ml. Floral frutal com mimosa. Oferta do ciclo: de R$ 74,90 por R$ 49,99.' },
  purCharm: { id:'purCharm', name:'Pur Blanca Charm', code:'135890', category:'Perfumaria Avon', price:49.99, shape:'bottle', c1:'#c6c0d8', c2:'#f3f0f8', cap:'#929597', description:'Deo Colônia 75 ml. Frutal floral com pétalas de muguet. Oferta do ciclo: de R$ 74,90 por R$ 49,99.' },
  purSerenity: { id:'purSerenity', name:'Pur Blanca Serenity', code:'135895', category:'Perfumaria Avon', price:49.99, shape:'bottle', c1:'#e7cc8a', c2:'#fbf1cf', cap:'#b67a4d', description:'Deo Colônia 75 ml. Floral fresco com margarida. Oferta do ciclo: de R$ 74,90 por R$ 49,99.' },
  purGardenia: { id:'purGardenia', name:'Pur Blanca Gardênia', code:'135891', category:'Perfumaria Avon', price:49.99, shape:'bottle', c1:'#eab5a9', c2:'#f9e6df', cap:'#96999a', description:'Deo Colônia 75 ml. Floral frutal com gardênia. Oferta do ciclo: de R$ 74,90 por R$ 49,99.' },
  velvet: { id:'velvet', name:'Batom Velvet', code:'10284', category:'Maquiagem', price:29.90, shape:'lip', c1:'#b83458', c2:'#f0a0ad', cap:'#54152d', description:'Cor intensa, toque macio e acabamento confortável para usar o dia todo.' },
  aura: { id:'aura', name:'Eau de Parfum Aura', code:'31742', category:'Perfumaria', price:89.90, shape:'bottle', c1:'#a5617b', c2:'#f0d2d9', cap:'#593044', description:'Uma fragrância floral marcante com notas luminosas e fundo envolvente.' },
  glow: { id:'glow', name:'Creme Facial Glow', code:'24108', category:'Cuidados', price:42.90, shape:'jar', c1:'#cfaaa1', c2:'#f7e6dc', cap:'#86605a', description:'Hidratação leve com acabamento radiante para todos os tipos de pele.' },
  verde: { id:'verde', name:'Sérum Botânico', code:'47613', category:'Bem-estar', price:54.90, shape:'bottle', c1:'#718d7e', c2:'#cbd8cc', cap:'#385347', description:'Textura fluida e refrescante com ativos de origem botânica.' },
  casa: { id:'casa', name:'Aroma Casa Serena', code:'58327', category:'Casa', price:36.90, shape:'bottle', c1:'#b88e63', c2:'#ead7c4', cap:'#5d4939', description:'Perfume aconchegante para deixar cada cantinho com sensação de casa cuidada.' },
  ritual: { id:'ritual', name:'Manteiga Ritual Leve', code:'69451', category:'Corpo', price:39.90, shape:'jar', c1:'#b7b494', c2:'#ede8d5', cap:'#68705b', description:'Nutrição intensa, fragrância delicada e uma pausa gostosa no seu dia.' }
};

const catalogData = {
  avonReal: { name:'Avon Cosméticos — Ciclo 01/2026', category:'Importação real', real:true, pages:[
    { catalogPage:3, image:'./assets/avon-ciclo-01/page-003.jpg', products:[
      { id:'purMyEssence', left:23, top:15, width:28, height:63 },
      { id:'purBlanca', left:49, top:21, width:28, height:59 }
    ]},
    { catalogPage:4, image:'./assets/avon-ciclo-01/page-004.jpg', products:[
      { id:'purHope', left:25, top:16, width:28, height:62 },
      { id:'purCharm', left:53, top:26, width:27, height:55 }
    ]},
    { catalogPage:5, image:'./assets/avon-ciclo-01/page-005.jpg', products:[
      { id:'purSerenity', left:24, top:16, width:25, height:62 },
      { id:'purGardenia', left:50, top:23, width:27, height:62 }
    ]}
  ]},
  aurora: { name:'Aurora — Ciclo 18', category:'Beleza', pages:[
    { kicker:'Nova coleção', title:'Cores que<br /><em>contam histórias</em>', copy:'Texturas confortáveis e tons criados para acompanhar todos os seus momentos.', bg:'#f7e9e6', stage:'#e4a4b0', products:['velvet','aura','glow'] },
    { kicker:'Cuidados diários', title:'Seu ritual,<br /><em>seu brilho</em>', copy:'Fórmulas leves para uma rotina simples, prazerosa e cheia de cuidado.', bg:'#eef1e8', stage:'#bdcbb1', products:['verde','glow','ritual'] },
    { kicker:'Presentes especiais', title:'Carinho em<br /><em>cada detalhe</em>', copy:'Combinações especiais para presentear alguém querido — ou você mesma.', bg:'#f6eee2', stage:'#e7c49d', products:['aura','ritual','velvet'] }
  ]},
  casa: { name:'Casa Clara — Especial', category:'Casa', pages:[
    { kicker:'Receber bem', title:'A beleza<br /><em>mora nos detalhes</em>', copy:'Peças e aromas para criar uma casa com afeto, personalidade e leveza.', bg:'#edf0e9', stage:'#aebda7', products:['casa','ritual','verde'] },
    { kicker:'Mesa posta', title:'Encontros que<br /><em>viram memória</em>', copy:'Cores naturais e formas delicadas para transformar momentos simples.', bg:'#f1e8dc', stage:'#d3b997', products:['casa','glow','ritual'] },
    { kicker:'Organização', title:'Tudo em seu<br /><em>melhor lugar</em>', copy:'Soluções bonitas e práticas para uma rotina mais fluida e organizada.', bg:'#e8eeed', stage:'#9bb3ad', products:['verde','casa','glow'] }
  ]},
  leve: { name:'Leve — Primavera', category:'Bem-estar', pages:[
    { kicker:'Rituais de autocuidado', title:'Um tempo<br /><em>só seu</em>', copy:'Aromas, texturas e pequenos gestos que ajudam você a desacelerar.', bg:'#eff0e5', stage:'#b8c3a1', products:['ritual','verde','glow'] },
    { kicker:'Corpo e banho', title:'Leveza da<br /><em>cabeça aos pés</em>', copy:'Produtos que transformam a rotina em um momento especial de cuidado.', bg:'#f3ebe1', stage:'#dfbea1', products:['ritual','aura','verde'] },
    { kicker:'Casa e sentidos', title:'Respire.<br /><em>Sinta. Relaxe.</em>', copy:'Fragrâncias para criar uma atmosfera acolhedora e renovar as energias.', bg:'#e8eeea', stage:'#a2b8a9', products:['casa','aura','ritual'] }
  ]}
};

let currentCatalog = 'aurora';
let currentPage = 0;
let selectedProduct = null;
let selectedQty = 1;
let cart = [];
let pendingWhatsappUrl = '';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const viewer = $('#catalog-viewer');
const backdrop = $('#backdrop');
const sheet = $('#product-sheet');
const drawer = $('#cart-drawer');

function shapeMarkup(product) {
  const dataLetter = product.shape === 'bottle' ? 'V' : '';
  return `<span class="product-shape shape-${product.shape}" data-letter="${dataLetter}" style="--c1:${product.c1};--c2:${product.c2};--cap:${product.cap}"></span>`;
}

function renderPage() {
  const catalog = catalogData[currentCatalog];
  const page = catalog.pages[currentPage];
  const pageElement = $('#magazine-page');
  $('#viewer-name').textContent = catalog.name;
  $('#viewer-category').textContent = catalog.category;
  $('#page-indicator').textContent = catalog.real
    ? `Página ${page.catalogPage} da revista • ${currentPage + 1} de ${catalog.pages.length}`
    : `Página ${currentPage + 1} de ${catalog.pages.length}`;
  $('#page-progress').style.width = `${((currentPage + 1) / catalog.pages.length) * 100}%`;
  $('#prev-page').disabled = currentPage === 0;
  $('#next-page').disabled = currentPage === catalog.pages.length - 1;

  if (catalog.real) {
    pageElement.className = 'magazine-page real-page';
    pageElement.innerHTML = `
      <img class="real-page-image" src="${page.image}" alt="Página ${page.catalogPage} da revista Avon Cosméticos Ciclo 01 de 2026" />
      <span class="real-import-pill">6 itens extraídos do PDF</span>
      ${page.products.map(item => {
        const product = products[item.id];
        return `<button class="real-hotspot" data-product="${item.id}" aria-label="Selecionar ${product.name}, código ${product.code}" style="left:${item.left}%;top:${item.top}%;width:${item.width}%;height:${item.height}%">
          <span class="real-hotspot-marker">+</span><span class="real-hotspot-label">${product.name} • ${money.format(product.price)}</span>
        </button>`;
      }).join('')}`;
    $('.swipe-hint').textContent = 'Toque nos sinais + para selecionar os produtos importados';
    $$('.real-hotspot').forEach(button => button.addEventListener('click', () => openProduct(button.dataset.product)));
    return;
  }

  pageElement.className = 'magazine-page';
  $('.swipe-hint').textContent = 'Toque em um produto para adicionar ao pedido';
  const positions = ['spread-product-one','spread-product-two','spread-product-three'];
  pageElement.innerHTML = `
    <div class="page-layout" style="--page-bg:${page.bg};--stage:${page.stage}">
      <div class="page-copy">
        <span class="page-kicker">${page.kicker}</span>
        <h2 class="page-title">${page.title}</h2>
        <p>${page.copy}</p>
        <span class="page-number-big">0${currentPage + 1}</span>
      </div>
      <div class="product-stage">
        <span class="stage-orb"></span><span class="decor-stroke"></span>
        ${page.products.map((id, index) => {
          const product = products[id];
          return `<button class="page-product ${positions[index]}" data-product="${id}" aria-label="Ver ${product.name}">
            <span class="product-marker">+</span>${shapeMarkup(product)}
            <span class="product-price-tag">${product.name}<strong>${money.format(product.price)}</strong></span>
          </button>`;
        }).join('')}
      </div>
    </div>`;
  $$('.page-product').forEach(button => button.addEventListener('click', () => openProduct(button.dataset.product)));
}

function openCatalog(id) {
  currentCatalog = id;
  currentPage = 0;
  renderPage();
  viewer.classList.add('open');
  viewer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  viewer.classList.remove('open');
  viewer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function changePage(direction) {
  const pages = catalogData[currentCatalog].pages;
  const next = currentPage + direction;
  if (next < 0 || next >= pages.length) return;
  const pageEl = $('#magazine-page');
  pageEl.classList.add('changing');
  window.setTimeout(() => { currentPage = next; renderPage(); }, 150);
}

function openOverlay(element) {
  backdrop.hidden = false;
  requestAnimationFrame(() => element.classList.add('open'));
  element.setAttribute('aria-hidden', 'false');
}

function closeOverlay(element) {
  element.classList.remove('open');
  element.setAttribute('aria-hidden', 'true');
  window.setTimeout(() => { if (!sheet.classList.contains('open') && !drawer.classList.contains('open')) backdrop.hidden = true; }, 350);
}

function openProduct(id) {
  selectedProduct = products[id];
  selectedQty = 1;
  $('#sheet-art').innerHTML = shapeMarkup(selectedProduct);
  $('#sheet-tag').textContent = selectedProduct.category;
  $('#sheet-name').textContent = selectedProduct.name;
  $('#sheet-description').textContent = selectedProduct.description;
  $('#sheet-code').textContent = selectedProduct.code;
  $('#sheet-price').textContent = money.format(selectedProduct.price);
  $('#qty-value').textContent = selectedQty;
  openOverlay(sheet);
}

function addToCart() {
  const existing = cart.find(item => item.id === selectedProduct.id);
  if (existing) existing.qty += selectedQty;
  else cart.push({ ...selectedProduct, qty:selectedQty });
  updateCart();
  closeOverlay(sheet);
  showToast(`${selectedProduct.name} adicionado ao pedido`);
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $$('[data-cart-count]').forEach(el => el.textContent = count);
  $('#empty-cart').hidden = cart.length > 0;
  $('#cart-summary').hidden = cart.length === 0;
  $('#cart-list').innerHTML = cart.map(item => `
    <article class="cart-item">
      <div class="cart-item-art">${shapeMarkup(item)}</div>
      <div class="cart-item-info"><span>${item.category}</span><strong>${item.name}</strong><small>Cód. ${item.code} • Qtd. ${item.qty}</small></div>
      <div class="cart-item-actions"><strong>${money.format(item.price * item.qty)}</strong><button data-remove="${item.id}">remover</button></div>
    </article>`).join('');
  $$('[data-remove]').forEach(button => button.addEventListener('click', () => {
    cart = cart.filter(item => item.id !== button.dataset.remove);
    updateCart();
  }));
  $('#cart-subtotal').textContent = money.format(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
}

function openCart() { closeOverlay(sheet); updateCart(); openOverlay(drawer); }

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function prepareMessage() {
  const customerName = $('#customer-name').value.trim();
  const lines = [customerName ? `Olá! Meu nome é ${customerName}. Gostaria de fazer este pedido:` : 'Olá! Gostaria de fazer este pedido:', ''];
  cart.forEach(item => lines.push(`• ${item.qty}x ${item.name} — cód. ${item.code} — ${money.format(item.price * item.qty)}`));
  lines.push('', `Total estimado: ${money.format(cart.reduce((sum, item) => sum + item.price * item.qty, 0))}`, '', 'Pode confirmar a disponibilidade para mim?');
  const message = lines.join('\n');
  $('#message-preview').textContent = message;
  pendingWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  closeOverlay(drawer);
  $('#message-dialog').showModal();
}

$$('[data-open-catalog]').forEach(button => button.addEventListener('click', () => openCatalog(button.dataset.openCatalog)));
$('#close-viewer').addEventListener('click', closeViewer);
$('#prev-page').addEventListener('click', () => changePage(-1));
$('#next-page').addEventListener('click', () => changePage(1));
$('#close-product').addEventListener('click', () => closeOverlay(sheet));
$('#qty-minus').addEventListener('click', () => { selectedQty = Math.max(1, selectedQty - 1); $('#qty-value').textContent = selectedQty; });
$('#qty-plus').addEventListener('click', () => { selectedQty += 1; $('#qty-value').textContent = selectedQty; });
$('#add-to-cart').addEventListener('click', addToCart);
['#header-cart','#mobile-cart','#viewer-cart'].forEach(id => $(id).addEventListener('click', openCart));
$('#close-cart').addEventListener('click', () => closeOverlay(drawer));
backdrop.addEventListener('click', () => { closeOverlay(sheet); closeOverlay(drawer); });
$('#empty-browse').addEventListener('click', () => { closeOverlay(drawer); closeViewer(); document.body.style.overflow=''; $('#revistas').scrollIntoView(); });
$('#checkout-button').addEventListener('click', prepareMessage);
$('#close-dialog').addEventListener('click', () => $('#message-dialog').close());
$('#finish-demo').addEventListener('click', () => {
  if (!pendingWhatsappUrl) return;
  const whatsappWindow = window.open(pendingWhatsappUrl, '_blank', 'noopener,noreferrer');
  if (!whatsappWindow) window.location.href = pendingWhatsappUrl;
  $('#message-dialog').close();
});
$('#dismiss-note').addEventListener('click', () => $('.prototype-note').remove());

$$('.filter').forEach(button => button.addEventListener('click', () => {
  $$('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  $$('.catalog-card').forEach(card => card.classList.toggle('filtered-out', button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter));
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeOverlay(sheet); closeOverlay(drawer); }
  if (viewer.classList.contains('open') && !sheet.classList.contains('open') && !drawer.classList.contains('open')) {
    if (event.key === 'ArrowLeft') changePage(-1);
    if (event.key === 'ArrowRight') changePage(1);
  }
});

updateCart();
