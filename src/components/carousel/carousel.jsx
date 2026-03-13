import './carousel.css';
import { render, Fragment } from 'preact';
import { html } from 'htm/preact';

function Carousel({ items }) {
  return html`
      <${Fragment}>
        ${items.map((item, i) => html`
          <div className='carousel_item' key=${i}>
            <img src="${item.img}">
            <div className='text_container'>
                <div className='text_content'>
                    <h1 className='text_content-title'>${item.title}</h1>
                    ${item.paragraph.map((p, j) => html`<p className='text_content-paragraph' key=${j}>${p}</p>`)}
                    ${item.button.text && html`<button onClick=${() => window.location.href = item.button.link}>${item.button.text}</button>`}
                </div>
            </div>
          </div>
        `)}
      </${Fragment}>
  `;
}

export default function decorate(block) {

    const data = [...block.querySelectorAll('[data-aue-component="carousel-item"]')]
        .map(row => {
            const button = {
                link: row.querySelector('a')?.href ?? '',
                text: row.querySelector('[data-aue-prop="buttonText"]')?.textContent.trim() ?? ''
            }
            return {
                img: row.querySelector('[data-aue-prop="image"]')?.src ?? '',
                title: row.querySelector('[data-aue-prop="title"]').textContent.trim(),
                paragraph: [(row.querySelectorAll('[data-richtext-prop=paragraph]') ?? [])].map(p => p.textContent.trim()),
                button
            }
        })

  block.innerHTML = '';

  render(html`<${Carousel} items=${data} />`, block);
}