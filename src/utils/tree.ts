export interface Node {
  key: string
  value: any
  parent?: Node
  children: Node[]
}

export class Node {
  constructor(key: string, value: unknown = key, parent?: Node) {
    this.key = key
    this.value = value
    this.parent = parent
    this.children = []
  }

  get isLeaf(): boolean {
    return this.children.length === 0
  }

  get hasChildren(): boolean {
    return !this.isLeaf
  }
}

export class Tree {
  root: Node
  
  constructor(key: string, value: unknown = key) {
    this.root = new Node(key, value)
  }

  *preOrderTraversal(node = this.root): Generator<Node> {
    yield node
    if (node.hasChildren) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child)
      }
    }
  }

  *postOrderTraversal(node = this.root): Generator<Node> {
    if (node.hasChildren) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child)
      }
    }
    yield node;
  }

  insert(parentNodeKey: string, key: string, value: unknown = key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new Node(key, value, node))
        return true
      }
    }
    return false
  }

  remove(key: string) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter(child => child.key !== key)
      if (filtered.length !== node.children.length) {
        node.children = filtered
        return true
      }
    }
    return false
  }

  find(key: string) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node
    }
    return undefined
  }
}
