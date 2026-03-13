import './carousel.css';
import { render, Fragment } from 'preact';
import { html } from 'htm/preact';

function Carousel({ items }) {
  return html`
      <${Fragment}>
        ${items.map((item, i) => html`
          <div className='carousel_item' key=${i}>
            <picture className='image' dangerouslySetInnerHTML=${{ __html: item.img }}/>
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

    const data = [...block.querySelectorAll(':scope > div')]
        .map(row => {
            const cols = [...row.querySelectorAll(':scope > div')]
            const buttonTag = cols[1]?.querySelector('a.button')
            const button = {
                link: buttonTag?.href ?? '',
                text: buttonTag?.textContent.trim() ?? ''
            }
            return {
                img: cols[0]?.querySelector('picture')?.innerHTML ?? '',
                title: cols[1]?.querySelector('h1, h2, h3, h4').textContent.trim(),
                paragraph: [...(cols[1]?.querySelectorAll('p:not([class]') ?? [])].map(p => p.textContent.trim()),
                button
            }
        })

  block.innerHTML = '';

  render(html`<${Carousel} items=${data} />`, block);
}