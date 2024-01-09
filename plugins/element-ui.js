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
  MessageBox,
  Message
} from 'element-ui';

Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Backtop);
Vue.use(Popover);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
