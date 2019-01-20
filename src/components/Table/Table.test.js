import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Table  from './Table'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new Adapter()})

describe('Button', () => {

  const props = {
    list: [
    { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
    { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    }

    it('отрисовывает без ошибки', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table {...props}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <Table {...props}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Отображает два элемента списка', () => {
    const element = shallow(
      <Table {...props} />
    )

    expect(element.find('.table-row').length).toBe(2)
  })

})
