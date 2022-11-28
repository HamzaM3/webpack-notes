export default (text = 'Hello world !') => {
  const element = document.createElement('div');
  element.innerText = text;
  element.style.color = "red";
  return element;
}