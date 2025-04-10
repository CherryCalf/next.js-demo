<template>
    <div>
        <div class="mt20">
            {{ string }}
            <button @click="onClickString">单击改变文字</button>
        </div>
        <div class="mt20">
            <!-- 这是一个循环渲染的例子 -->
            <li v-for="item in array">
                {{ item }}
            </li>
            <button @click="addArray">加一条</button>
            <button @click="subArray">减一条</button>
            <span>通过改变数组来控制渲染的条数</span>
        </div>
        <div class="mt20">
            <!-- 这是一个条件渲染的例子 -->
            <div v-if="boolean">这是一个条件渲染的例子，使用了下面定义的boolean变量来做条件</div>
            <button @click="onClickBoolean">单击使文字隐藏或显示，当球为{{ isTrue }}</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// 使用ref来定义响应式数据，当变量声明为ref对象后，变量会在数据变化时重新渲染页面
// 这是一个字符串类型的ref对象
const string = ref('Hello from Demo.vue!')
// 这是一个数字类型的ref对象
const number = ref(0)
// 这是一个布尔类型的ref对象
const boolean = ref(true)
// 这是一个对象类型的ref对象
const object = ref({
    name: 'Vue3',
    age: 3,
    isActive: true
})
// 这是一个数组类型的ref对象
const array = ref([1, 2, 3, 4, 5])
// 这是一个函数类型的ref对象
const func = ref(() => {
    console.log('Hello from func!')
})
// 除ref外，Vue3还提供了reactive函数来创建响应式对象，reactive函数会返回一个响应式对象，而ref函数会返回一个响应式引用
// reactive函数的使用方式与ref函数类似，reactive函数会返回一个响应式对象，而ref函数会返回一个响应式引用
// vue中，ref是为了让基本数据类型变成响应式的，而reactive是为了让对象变成响应式的
// 但是vue的作者尤雨溪说过，无脑用ref就行了，reactive的使用场景比较少
const onClickString = () => {
    // 通过.value来获取ref对象的值
    console.log(string.value)
    // 通过.value来修改ref对象的值
    string.value = 'Button clicked!'
    // ref对象必须使用.value来访问和修改值!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
const isTrue = ref("显示")
const onClickBoolean = () => {
    // 通过.value来获取ref对象的值
    console.log(boolean.value)
    // 通过.value来修改ref对象的值
    boolean.value = !boolean.value
    if (boolean.value) {
        isTrue.value = "显示"
    } else {
        isTrue.value = "隐藏"
    }
}
const addArray = () => {
    // 通过.value来获取ref对象的值
    console.log(array.value)
    // 通过.value来修改ref对象的值
    array.value.push(array.value.length + 1)
}
const subArray = () => {
    // 通过.value来获取ref对象的值
    console.log(array.value)
    // 通过.value来修改ref对象的值
    array.value.pop()
}
// 生命周期函数，在组件实例被挂载后调用
// 这个函数会在组件实例被挂载后立即调用，通常用于执行一些初始化操作，比如获取数据、设置事件监听等
onMounted(() => {
    console.log('生命周期函数：onMounted')
})
// 还有其他的生命周期函数，比如：
// onBeforeMount：在组件实例被挂载之前调用
// onBeforeUpdate：在组件更新之前调用
// onUpdated：在组件更新之后调用
// onBeforeUnmount：在组件实例被卸载之前调用
// onUnmounted：在组件实例被卸载之后调用
// onActivated：在keep-alive组件激活时调用
// onDeactivated：在keep-alive组件停用时调用
// onErrorCaptured：在子组件抛出错误时调用
// onRenderTracked：在组件渲染时被追踪的响应式依赖变化时调用
// onRenderTriggered：在组件渲染时被触发的响应式依赖变化时调用
// onErrorCaptured：在子组件抛出错误时调用
// onActivated：在keep-alive组件激活时调用
// onDeactivated：在keep-alive组件停用时调用
// onServerPrefetch：在服务端渲染时调用
// onBeforeRouteLeave：在路由离开之前调用
// onBeforeRouteUpdate：在路由更新之前调用
// onBeforeRouteEnter：在路由进入之前调用
// ！！！！！！！最常用的是onMounted和onUnmounted，分别在组件挂载和卸载时调用！！！！！！！ 上面那么多可以忽略了
</script>


<style scoped>
.mt20 {
    margin-top: 20px;
}
</style>
