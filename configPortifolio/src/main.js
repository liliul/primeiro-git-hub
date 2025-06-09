import './style/style.scss';
import './style/cors.js';
import './layout/index.js';

import './components/index.js'
import { MenuContatos } from './hook/menuContato.js';
const menuContato = new MenuContatos()
menuContato.renderMenuContatos()