# port :8080

# 别名 yarn add @types/node --D

# scoped 防止 css 样式污染

# ref 创建基本数据类型 对象也可以

     修改值 XXX.value
     例子：let obj = ref({name:'cxl'})
        必须这么写 obj.value.name = 'cxl2'

# reactive 只能定义对象响应式数据

     直接修改即可
     let obj = reactive({name:'cxl'})
     修改{} 时 需要 Object.assign(obj, {name:'cxl2'})

# torefs (需要 reactive 定义的数据)

     let { name, price } = toRefs(car)  定义的也是响应

# toref

     let  name = toRef(car，'name') 一个一个取出来

# computed 计算属性

     let  name = computed(() => {return 'cxl'})
     计算属性  只有getter  不能有setter
     <!-- 可读可写 -->
     let  name = computed({
       get(){return 'cxl'},
       set(value){console.log(value)}
     })

# watch 监听数据变化

     watch(name, (newVal, oldVal) => {
       console.log(newVal, oldVal)
     })
     watch(name, (newVal, oldVal) => {
       console.log(newVal, oldVal)
     }, {deep:true})  deep:true  监听对象属性变化  reactive默认开启深度监听的
     watch(name, (newVal, oldVal) => {
       console.log(newVal, oldVal)
     }, {immediate:true})  immediate:true  立即执行
     若取消监听  let x = watch(name, (newVal, oldVal) => {
       console.log(newVal, oldVal)
       if(newVal === 'cxl'){
         x()
       }
     })
     从而取消监听

     监听对象属性的时候
     watch(()=> obj.name, (newVal, oldVal) => {
       console.log(newVal, oldVal)
     })
     对象的地址改变后监听失效   建议写成  ()=>obj.obj1  对象里边写的也会失效需要加上deep
     监听多个数据
     watch([name,price,()=>obj], (newVal, oldVal) => {
       console.log(newVal, oldVal)
     })

# watchEffect 监听数据变化 异步 不需要指定监听的值

     watchEffect(() => {
       console.log(name.value)
     })
     watchEffect(() => {
       console.log(name.value)
     }, {flush:'post'})  异步
     watchEffect(() => {
       console.log(name.value)
     }, {onTrack:()=>{},onTrigger:()=>{},onStop:()=>{},immediate:true})  监听

# 标签里的 ref

     ref="id1"
     let x = ref()  直接可以获取到内容
     ref 在子组件上时 需要引入defineExpose
     defineExpose({})

# props 组件传值

默认值 以及类型 必要性
withDefaults(defineProps<{list?:Sons}>(),{
list:()=>[
{id:'qqqqqq',name:'qqqqqq',age:12,},
{id:'qqqqqq',name:'qqqqqq',age:12,},
{id:'qqqqqq',name:'qqqqqq',age:12,},
]
})

# 生命周期

setup(){
onMounted(()=>{
console.log('挂载完成')
})
onBeforeMount(()=>{
console.log('挂载前')
})

    onBeforeUpdate(()=>{
      console.log('更新前')
    })
    onUpdated(()=>{
      console.log('更新完毕')
    })
    onbeforeUnmount(()=>{
      console.log('卸载前')
    })
    onUnmounted(()=>{
      console.log('卸载完成')
    })

}

# 自定义 hooks

相当于 导出模块
import {useMemo,useRef,useState} from 'vue'

export default function (){

    return {

    }

}

# 路由导航

import { useRouter } from 'vue-router'
const router = useRouter()

:to="{path:'/home'}"
to="/home"
:to="{name:'home'}"
:to="{path:'/home',query:{id:1}}"
to="/home?id=1"
:to="{path:'/home',params:{id:1}}"
to="/home/1"
(路由配置 ：
:to="{
name:"home", //坑 要求必须是 name 不能是 path
parms:{id:1} // 并且 不能传对象和数组
}"
)

# 路由 props

defineProps({id,title,content})
路由配置需要
props:true 1
props(route){ 2 函数写法
return route.query
}
props:{ // 3 对象写法 较少使用
a:100,
b:200
}

# replace

替换历史记录 在 routerlink 上写 replace 属性

# 编程式路由导航

router.push({path:'/home'})
router.replace({path:'/home'})
router.go(-1)
router.back()
router.forward()

# 编程式路由导航 传参

router.push({path:'/home',query:{id:1}})
router.replace({path:'/home',query:{id:1}})

# pinia

staoreToRefs(store) 只负责数据 不管方法
.$subscribe(()=>{})
