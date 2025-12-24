// 临时脚本，用于更新mock_data.js文件中的site对象
import fs from 'fs/promises';

async function updateMockData() {
  // 读取mock_data.js文件
  const filePath = 'd:\\project\\nav\\mao_nav\\src\\mock\\mock_data.js';
  const content = await fs.readFile(filePath, 'utf8');

  // 提取mockData对象
  const mockDataMatch = content.match(/export const mockData = (.*?)$/s);
  if (!mockDataMatch) {
    console.error('未找到mockData对象');
    process.exit(1);
  }

  // 解析JSON数据
  const mockData = JSON.parse(mockDataMatch[1]);

  // 遍历所有categories和sites，添加type和remark字段
  mockData.categories.forEach(category => {
    if (category.sites) {
      category.sites.forEach(site => {
        // 确保每个site对象都有type和remark字段
        site.type = 'site';
        site.remark = '';
      });
    }
  });

  // 将更新后的数据转换回字符串
  const updatedMockDataStr = JSON.stringify(mockData, null, 2);

  // 替换原始文件中的mockData对象
  const updatedContent = content.replace(/export const mockData = (.*?)$/s, `export const mockData = ${updatedMockDataStr}`);

  // 写回文件
  await fs.writeFile(filePath, updatedContent, 'utf8');

  console.log('更新完成！所有site对象都已添加type和remark字段。');
}

updateMockData();
