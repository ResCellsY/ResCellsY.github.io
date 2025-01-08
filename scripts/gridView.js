class GridView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentItems = [];
    }

    createItemElement(item, type = 'file') {
        const itemElement = document.createElement('div');
        itemElement.className = 'folder-item';
        
        const icon = document.createElement('span');
        icon.className = type === 'file' ? 'file-icon' : 'folder-icon';
        icon.textContent = type === 'file' ? '📄' : '📁';
        
        const title = document.createElement('span');
        title.className = 'folder-item-title';
        title.textContent = item.title || item.name;
        title.title = item.title || item.name; // 添加悬停提示
        
        itemElement.appendChild(icon);
        itemElement.appendChild(title);
        
        return itemElement;
    }

    renderItems(items, type = 'file') {
        this.container.innerHTML = '';
        this.currentItems = items;

        if (!items || items.length === 0) {
            this.showEmptyState();
            return;
        }

        items.forEach(item => {
            const itemElement = this.createItemElement(item, type);
            
            // 添加点击事件
            itemElement.addEventListener('click', () => {
                if (type === 'file') {
                    this.handleFileClick(item);
                } else {
                    this.handleFolderClick(item);
                }
            });

            this.container.appendChild(itemElement);
        });
    }

    showEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = '暂无内容';
        this.container.appendChild(emptyState);
    }

    handleFileClick(item) {
        // 触发自定义事件
        const event = new CustomEvent('fileSelected', { detail: item });
        this.container.dispatchEvent(event);
    }

    handleFolderClick(item) {
        // 触发自定义事件
        const event = new CustomEvent('folderSelected', { detail: item });
        this.container.dispatchEvent(event);
    }
} 