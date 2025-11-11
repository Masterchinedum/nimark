import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'

async function main() {
  try {
    console.log('Fetching all categories...\n')
    
    const categories = await prisma.category.findMany({
      where: { storeId: STORE_ID },
      select: {
        id: true,
        name: true,
        parentId: true,
        billboardId: true,
      },
      orderBy: { name: 'asc' }
    })

    // Build category tree
    const categoryMap = new Map()
    const roots: any[] = []

    categories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] })
    })

    categories.forEach(cat => {
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId)
        if (parent) {
          parent.children.push(categoryMap.get(cat.id))
        }
      } else {
        roots.push(categoryMap.get(cat.id))
      }
    })

    function printTree(node: any, indent: string = '') {
      console.log(`${indent}📁 ${node.name} (ID: ${node.id.substring(0, 8)}...)`)
      if (node.billboardId) {
        console.log(`${indent}   └─ Billboard: ${node.billboardId.substring(0, 8)}...`)
      }
      node.children.forEach((child: any, index: number) => {
        const isLast = index === node.children.length - 1
        printTree(child, indent + (isLast ? '   ' : '│  '))
      })
    }

    console.log('\n=== CATEGORY STRUCTURE ===\n')
    roots.forEach(root => printTree(root))

    console.log(`\n\nTotal categories: ${categories.length}`)
    console.log(`Root categories: ${roots.length}`)

  } catch (error) {
    console.error('Error:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
