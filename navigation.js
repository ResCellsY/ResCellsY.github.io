let currentPath = ['root'];
let activeGroup = null;

function initializeNavigation() {
    const treeNav = document.getElementById('treeNav');
    
    navConfig.groups.forEach(group => {
        const li = document.createElement('li');
        
        const groupTitle = document.createElement('div');
        groupTitle.className = 'group-title';
        groupTitle.innerHTML = `
            <span class="arrow">▶</span>
            ${group.name}
        `;
        
        const groupItems = document.createElement('div');
        groupItems.className = 'group-items';
        
        groupTitle.addEventListener('click', (e) => {
            // 关闭其他打开的组
            if (activeGroup && activeGroup !== groupItems) {
                activeGroup.classList.remove('active');
                activeGroup.previousElementSibling.querySelector('.arrow').classList.remove('active');
            }
            
            groupItems.classList.toggle('active');
            const arrow = groupTitle.querySelector('.arrow');
            arrow.classList.toggle('active');
            
            activeGroup = groupItems;
            updateFolderView(group);
            updateBreadcrumb(group.name);
        });
        
        group.items.forEach(item => {
            const link = document.createElement('a');
            link.href = "#";
            link.className = 'nav-item';
            link.textContent = item.title;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openContent(item);
            });
            groupItems.appendChild(link);
        });
        
        li.appendChild(groupTitle);
        li.appendChild(groupItems);
        treeNav.appendChild(li);
    });

    // 初始化返回按钮
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        showFolderView();
    });
}

function openContent(item) {
    const folderGrid = document.getElementById('folderGrid');
    const iframeContainer = document.getElementById('iframeContainer');
    const contentFrame = document.getElementById('contentFrame');
    const backButton = document.getElementById('backButton');

    // 先设置 src，确保内容加载
    contentFrame.src = item.url;

    // 隐藏网格，显示 iframe
    folderGrid.style.display = 'none';
    iframeContainer.classList.add('active');
    backButton.classList.add('active');
}

function showFolderView() {
    const folderGrid = document.getElementById('folderGrid');
    const iframeContainer = document.getElementById('iframeContainer');
    const backButton = document.getElementById('backButton');
    const contentFrame = document.getElementById('contentFrame');

    iframeContainer.classList.remove('active');
    backButton.classList.remove('active');
    
    setTimeout(() => {
        folderGrid.style.display = 'grid';
        folderGrid.classList.remove('fade-out');
        folderGrid.classList.add('fade-in');
        contentFrame.src = '';
    }, 300);
}

function updateFolderView(group) {
    const folderGrid = document.getElementById('folderGrid');
    
    // 添加淡出动画
    folderGrid.classList.add('fade-out');
    
    setTimeout(() => {
        folderGrid.innerHTML = '';
        group.items.forEach(item => {
            const folderItem = document.createElement('div');
            folderItem.className = 'folder-item';
            folderItem.innerHTML = `
                <span class="file-icon">📄</span>
                ${item.title}
            `;
            folderItem.addEventListener('click', () => {
                openContent(item);
                // 同步左侧导航栏
                const navItem = document.querySelector(`.nav-item[href="#"]:contains("${item.title}")`);
                if (navItem) {
                    navItem.click();
                }
            });
            folderGrid.appendChild(folderItem);
        });
        
        folderGrid.classList.remove('fade-out');
        folderGrid.classList.add('fade-in');
    }, 300);
}

// ... 保留其他函数 (updateBreadcrumb, showRootView) ...

// 添加一个辅助函数来同步打开左侧导航栏
function openNavGroup(groupName) {
    const groupTitles = document.querySelectorAll('.group-title');
    groupTitles.forEach(title => {
        if (title.textContent.trim() === groupName) {
            if (!title.nextElementSibling.classList.contains('active')) {
                title.click();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    showRootView();
}); 