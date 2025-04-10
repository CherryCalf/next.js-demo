<template>
    <div>
        {{ message }}
        <div>
            <button @click="onClick">isme</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// 使用ref来定义响应式数据，当变量声明为ref对象后，变量会在数据变化时重新渲染页面
const message = ref('Hello from Demo.vue!')
const onClick = () => {
    // 通过.value来获取ref对象的值
    console.log(message.value)
    // 通过.value来修改ref对象的值
    message.value = 'Button clicked!'
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
// 最常用的是onMounted和onUnmounted，分别在组件挂载和卸载时调用
</script>

<style lang="scss" scoped></style>
