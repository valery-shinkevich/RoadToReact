import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Button  from './Button'

import Enzyme, { render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new Adapter()})

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

  it('Отображает два элемента списка', () => {
    const element = render(
      <Button>Test</Button>
    )

    expect(element[0].name).toBe('button')
    expect(element[0].children[0].data).toBe('Test')
  })

})
