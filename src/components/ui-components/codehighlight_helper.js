
import Vue from 'vue';

const RenderNode = {
    props: ['node'],
    render(h, context) {
        return this.node ? this.node : ''
    }
};
const getEl = (vueVNodes) => {
    const DetailConstructor = Vue.extend(RenderNode);
    const detailRenderer = new DetailConstructor({
        propsData: {
            node: vueVNodes
        }
    });

    detailRenderer.$mount();
    return detailRenderer.$el;
}

const getRawTextFromVueSlot = (slotContent) => {
    const renderedVueComponent = getEl(slotContent);
    const parentWrapperJustForGettingAccessToInnerHTML = document.createElement('div');
    parentWrapperJustForGettingAccessToInnerHTML.appendChild(renderedVueComponent);
    return parentWrapperJustForGettingAccessToInnerHTML.innerHTML;
};

export { getRawTextFromVueSlot };
