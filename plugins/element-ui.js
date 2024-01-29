import Vue from 'vue'
import {
  Input,
  Select,
  Pagination,
  Button,
  Backtop,
  Dialog,
  Popover,
  Form,
  FormItem,
  Checkbox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Carousel,
  CarouselItem,
  MessageBox,
  Message
} from 'element-ui';

Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Backtop);
Vue.use(Popover);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
