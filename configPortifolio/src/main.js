import './style/style.scss';
import './style/cors.js';
import './layout/index.js';

import './hook/langs.js'
import { MenuContatos } from './hook/menuContato.js';
const menuContato = new MenuContatos()
menuContato.renderMenuContatos()