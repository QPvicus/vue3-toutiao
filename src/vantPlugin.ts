import { App } from 'vue'
import { Button, Tabbar, TabbarItem, NavBar, CellGroup, Field } from 'vant'
const vantComponent = [Button, Tabbar, TabbarItem, NavBar, CellGroup, Field]
export const vantPlguin = {
  install: (app: App): void => {
    vantComponent.forEach((item) => {
      app.component(item.name, item)
    })
  },
}
