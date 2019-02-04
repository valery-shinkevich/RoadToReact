import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Search  from './Search'

describe('Search', () => {

  const props ={
    hitsPerPage: 5, onChange: ()=>{}, onHppChange:()=>{}, onSubmit:()=>{}
  }

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search {...props} >Поиск</Search>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <Search {...props}>Поиск</Search>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})
