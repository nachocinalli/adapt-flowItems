import React from 'react';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function FlowItems({
  onClick,
  _items,
  _buttons,
  _isSequential,
  ...props
}) {
  const _totalItems = _items.length;
  const _itemActive = _items.filter((item) => item._isActive)[0]?._index;

  return (
    <div className='component__inner flowitems__inner'>
      <templates.header {...props} />
      <div className='component__widget flowitems__widget'>

        <div className='flowitems__container-items' role='list'>

          {_items.map(({ _isActive, _isVisited, _index, title, body, _graphic, _classes, _items }, _itemIndex) => (
            <div className={classes(['flowitems__flow',
              _isActive && 'is-active',
              _isVisited && 'is-visited',

              _classes ])}
            data-index={_index}
            key={_index}>
              <div className='flowitems__flow-container'>
                <templates.image {..._graphic}
                  classNamePrefixes={[
                    'component',
                    'flowitems-flow'
                  ]}
                />

                {title && <div className='flowitems__flow-title'>
                  {html(compile(title))}
                </div>
                }
                {body && <div className='flowitems__flow-body'>
                  {html(compile(body))}
                </div>
                }
              </div>
              <div className='flowitems__flow-items-container'>
                {_items.map(({ title, body, _graphic, _classes }, _flowIndex) => (
                  <div
                    className={classes([
                      'flowitems__flow-item',
                      _graphic.src && 'has-image',

                      _classes
                    ])}
                    key={_flowIndex}
                    data-index={_flowIndex}
                    role="listitem"
                  >
                    <templates.image {..._graphic}
                      classNamePrefixes={[
                        'component',
                        'flowitems-item'
                      ]}
                    />
                    {title && (
                      <div className='flowitems__flow-item-title'>
                        {html(compile(title))}
                      </div>
                    )}
                    {body && (
                      <div className='flowitems__flow-item-body'>
                        {html(compile(body))}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='flowitems__footer'>
          <div className='flowitems__progress'>
            {_itemActive >= 0 &&
            <div className='flowitems__progress-current'>{_itemActive + 1}</div>
            }
            <div className='flowitems__progress-sep'>/</div>
            <div className='flowitems__progress-total'>{_totalItems}</div>
          </div>
          {_buttons &&
          <div className='flowitems__actions'>
            {_buttons._next && <button onClick={onClick} disabled={_itemActive === _totalItems - 1}
              className={classes([
                'btn-text',
                'flowitems__next',
                (_itemActive === _totalItems - 1) ? 'is-disabled' : ''

              ])}
              aria-label={_buttons._next.ariaLabel}>
              <div className={classes([
                'icon',
                _buttons._next._icon._classes
              ])}>
                {_buttons._next._icon.src && (
                  <img src={_buttons._next._icon.src} alt={_buttons._next._icon.alt} />
                )}
              </div>
              {_buttons._next.text && (
                <div className='flowitems__next-text'>
                  {html(compile(_buttons._next.text))}
                </div>
              )}
            </button>
            }
            {!_isSequential && _buttons._end &&
            <button onClick={onClick} disabled={_itemActive < _totalItems - 1}
              className={classes([
                'btn-text',
                'flowitems__end',
                (_itemActive < _totalItems - 1) ? 'is-disabled' : ''
              ])}
              aria-label={_buttons._end.ariaLabel}>
              <div className={classes([
                'icon',
                _buttons._end._icon._classes
              ])}>
                {_buttons._end._icon.src && (
                  <img src={_buttons._end._icon.src} alt={_buttons._end._icon.alt} />
                )}
              </div>
              {_buttons._end.text && (
                <div className='flowitems__end-text'>
                  {html(compile(_buttons._end.text))}
                </div>
              )}
            </button>
            }
          </div>
          }
        </div>

      </div>

    </div>
  );
}
