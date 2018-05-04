import { genres } from '../config/api.config';

const mapGenres = ids => ids.map(id => genres[id]).join(', ');

export default mapGenres;
