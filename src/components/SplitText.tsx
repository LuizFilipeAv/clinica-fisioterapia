import { Fragment, type ElementType } from 'react'

type SplitTextProps = {
  text: string
  as?: ElementType
  className?: string
}

/**
 * Splits text into clipped words of individual letters so they can rise into place.
 * Lines are separated with "\n". Screen readers get the plain text through aria-label.
 */
export function SplitText({ text, as: Tag = 'span', className }: SplitTextProps) {
  const lines = text.split('\n')

  return (
    <Tag className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, l) => (
        <span key={l} aria-hidden="true" style={{ display: 'block' }}>
          {line.split(' ').map((word, w, words) => (
            <Fragment key={w}>
              <span className="split-word">
                {[...word].map((char, c) => (
                  <span className="split-letter" key={c}>
                    {char}
                  </span>
                ))}
              </span>
              {w < words.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  )
}
