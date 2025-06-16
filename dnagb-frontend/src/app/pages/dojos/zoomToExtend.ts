export class ZoomToExtendControl {
  _map: any;
  _container: any;
  _icon: any;

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement('button');
    this._container.setAttribute('title', 'Startansicht');
    this._icon = document.createElement('span');
    this._icon.style =
      'background-image: url(../assets/icons/recenter.svg); background-size: cover; width: 20px; height: 20px;';
    this._container.appendChild(this._icon);
    this._icon.classList.add('icon-resize-full-alt');
    this._container.addEventListener('click', () => {
      this._map.easeTo({ center: [10.415, 51.356], zoom: 5.3 });
    });
    this._container.className = 'maplibregl-ctrl zoom-to-extent';
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
