export default class TabSelector
{
    #selectors = {};

    constructor()
    {
        for (const elm of document.querySelectorAll('[data-tab-selector-id]')) {
            this.enable(elm);
        }
    }

    enable(elm)
    {
        let id = Object.keys(this.#selectors).length;
        this.#selectors[id] = elm;

        for (let tabButton of elm.querySelectorAll('[data-tab]')) {
            tabButton.addEventListener('click', (e) => {
                this.#changeTab(id, e.currentTarget.dataset.tab);
            });
        }

        if (elm.dataset.baseUrl) {
            window.addEventListener('popstate', (e) => {
                let tab;
                if (e.state && e.state.tabId) {
                    tab = e.state.tabId;
                } else {
                    tab = elm.querySelector('[data-tab]:first-of-type').dataset.tab;
                }

                this.#changeTab(id, tab, false);
            });
        }
    }

    #changeTab(id, targetTab, pushState = true)
    {
        let elm = this.#selectors[id];

        for (const tab of elm.querySelectorAll('[data-tab].active')) {
            tab.classList.remove('active');
        }
        for (const tab of elm.querySelectorAll('[data-tab="' + targetTab + '"]')) {
            tab.classList.add('active');
        }
        for (const tab of elm.querySelectorAll('[data-tab-id]')) {
            tab.hidden = tab.dataset.tabId !== targetTab;
        }

        if (elm.dataset.baseUrl && pushState) {
            history.pushState({tabId: targetTab}, '', elm.dataset.baseUrl + targetTab);
        }

        window.dispatchEvent(new CustomEvent('tab-change', {
            detail: {
                selector: elm.dataset.tabSelectorId, tab: targetTab
            }
        }));
    }
}

Object.freeze(TabSelector.prototype);