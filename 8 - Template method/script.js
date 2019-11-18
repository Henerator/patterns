const pageBuilderContainer = document.getElementById('page-builder-container');
const menuPageBuilderContainer = document.getElementById('menu-page-builder-container');
const loginPageBuilderContainer = document.getElementById('login-page-builder-container');
const designedPageBuilderContainer = document.getElementById('designed-page-builder-container');


class BasePageBuilder {
  constructor(containerElement){
    this.containerElement = containerElement;
  }
  build() {
    this.clearPage();   // base step
    this.addHeader();
    this.addMenuHook(); // optional step
    this.addContent();  // abstract step (should be implemented)
    this.addFooter();
  }
  clearPage() {
    this.containerElement.innerHTML = '';
  }
  addMenuHook() {
  }
  addContent() {
    const header = this.createItemElement('Content');
    this.appendPageItem(header);
  }
  addHeader() {
    const header = this.createItemElement('Header');
    this.appendPageItem(header);
  }
  addFooter() {
    const footer = this.createItemElement('Footer');
    this.appendPageItem(footer);
  }
  appendPageItem(item) {
    this.containerElement.appendChild(item);
  }
  createItemElement(title) {
    const element = document.createElement('div');
    element.className = 'column__item';
    element.innerText = title;
    return element;
  }
}

class MenuPageBuilder extends BasePageBuilder {
  addMenuHook() {
    const menu = this.createItemElement('Menu');
    this.appendPageItem(menu);
  }
}

class LoginPageBuilder extends BasePageBuilder {
  addContent() {
    const loginForm = this.createItemElement('Login form');
    this.appendPageItem(loginForm);
  }
}

class DesignedPageBuilder extends BasePageBuilder {
  createItemElement(title) {
    const element = document.createElement('div');
    element.classList.add('column__item');
    element.classList.add('column-item_orange');
    element.innerText = title;
    return element;
  }
}

const basePageBuilder = new BasePageBuilder(pageBuilderContainer);
basePageBuilder.build();

const menuPageBuilder = new MenuPageBuilder(menuPageBuilderContainer);
menuPageBuilder.build();

const loginPageBuilder = new LoginPageBuilder(loginPageBuilderContainer);
loginPageBuilder.build();

const designedPageBuilder = new DesignedPageBuilder(designedPageBuilderContainer);
designedPageBuilder.build();