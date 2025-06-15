

import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const { query } = req.query;
  const trimmedQuery = (query || "").trim().toLowerCase();

  if (!trimmedQuery) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json"
    );
    const fileData = await fs.readFile(filePath, "utf8");

    let products = [];
    try {
      products = JSON.parse(fileData);
    } catch (jsonError) {
      console.error("Invalid JSON format in products.json:", jsonError);
      return res.status(500).json({ error: "Invalid data format" });
    }

    const filtered = products
      .filter((product) => {
        // جستجو در title
        const titleMatch = (product.title?.toLowerCase() || "").includes(
          trimmedQuery
        );

        // جستجو در searchDesc (حالا چه رشته باشد چه آرایه)
        const searchDescMatch =
          typeof product.searchDesc === "string"
            ? product.searchDesc.toLowerCase().includes(trimmedQuery)
            : Array.isArray(product.searchDesc)
            ? product.searchDesc.some((item) =>
                (item.descTitle?.toLowerCase() || "").includes(trimmedQuery)
              )
            : false;

        // جستجو در description
        const descriptionMatch = Array.isArray(product.description)
          ? product.description.some((item) =>
              (item.descTitle?.toLowerCase() || "").includes(trimmedQuery)
            )
          : false;

        // جستجو در advices
        const advicesMatch = Array.isArray(product.advices)
          ? product.advices.some((item) =>
              (item.advTitle?.toLowerCase() || "").includes(trimmedQuery)
            )
          : false;

        return (
          titleMatch || searchDescMatch || descriptionMatch || advicesMatch
        );
      })
      .slice(0, 10) // محدود کردن نتایج به ۱۰ مورد
      .map((product) => ({
        id: product.id,
        title: product.title,
        imgSrc: product.imgSrc,
        categoryId: product.categoryId,
      })); // برگرداندن اطلاعات مفیدتر

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error reading products.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
