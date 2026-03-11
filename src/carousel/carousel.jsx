import { render } from 'preact';
import { html } from 'htm/preact';

function Carousel({ items }) {
  return html`
    <ul>
      ${items.map((item, i) => html`<li key=${i}>${item.title}</li>`)}
    </ul>
  `;
}

export default function decorate(block) {
  const items = [...block.querySelectorAll('p')]
    .map(p => ({ title: p.textContent.trim() }))
    .filter(item => item.title);

  block.innerHTML = '';

  render(html`<${Carousel} items=${items} />`, block);
}