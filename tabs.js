const tabsList = document.querySelector('[role="tablist"]');
const tabs = tabsList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

const changeTabFocus = (event) => {
        const keyCodeLeft = 37;
        const keyCodeRight = 39;

        if (event.keyCode === keyCodeLeft || event.keyCode === keyCodeRight) {
                tabs[tabFocus].setAttribute('tabindex', -1);


                if (event.keyCode === keyCodeRight) {
                        tabFocus++;
                        if (tabFocus >= tabs.length) {
                                tabFocus = 0;
                        }
                } else if (event.keyCode === keyCodeLeft) {
                        tabFocus--;
                        if (tabFocus < 0) {
                                tabFocus = tabs.length - 1;
                        }
                }

                tabs[tabFocus].setAttribute('tabindex', 0);
                tabs[tabFocus].focus();
        }
}

const hideContent = (parent, content) => {
        parent.querySelectorAll(content).forEach((item) => {
                item.setAttribute('hidden', true);
        });
};

const showContent = (parent, content) => {
        parent.querySelector([content]).removeAttribute('hidden');
};

const changeTabPanel = (event) => {
        const targetTab = event.target;
        const targetPanel = targetTab.getAttribute('aria-controls');
        const targetImg = targetTab.getAttribute('data-img');

        const tabContainer = targetTab.parentNode;
        const mainContainer = tabContainer.parentNode;

        // Changing Description of article 
        hideContent(mainContainer, '[role="tabpanel"]');
        showContent(mainContainer, `#${targetPanel}`);

        //Changing Image of article
        hideContent(mainContainer, 'picture');
        showContent(mainContainer, `#${targetImg}`);

        //Changing tab highlight
        tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
        targetTab.setAttribute('aria-selected', true);
}

tabsList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
        tab.addEventListener('click', changeTabPanel);
})