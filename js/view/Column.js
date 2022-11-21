import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(".kanban_column_title");
		this.elements.items = this.elements.root.querySelector(".kanban_column_items");
		this.elements.addItem = this.elements.root.querySelector(".kanban_add_item");

		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.items.appendChild(topDropZone);

		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});

		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban_column col-lg-4 col-12">
				<div class="kanban_column_title primary sticky-top text-center pb-3"></div>
				<div class="sticky-top kanban_column_inner">
					<div class="kanban_column_items"></div>
					<button class="kanban_add_item bg-black w-100" type="button">+ Add</button>
				</div>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}
}