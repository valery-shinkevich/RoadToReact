import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Button  from './Button'

describe('Button', () => {

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>Поиск</Button>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <Button>Поиск</Button>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})
