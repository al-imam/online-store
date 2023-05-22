import Product from "@/backend/models/product";
import filter from "@/backend/util/filter";
import RequestHandler from "@/types/RequestHandler";
import wrap from "@/utility/wrapHandler";

const single = 2;

function calculateSkipNumber(num: string, fallback: number = 0) {
  const n = parseInt(num as string);
  if (isNaN(n)) return fallback;

  return n === 0 ? 0 : n * single - single;
}

const addProduct: RequestHandler = wrap(async (req, res) => {
  const newDocs = await Product.create(req.body._valid_object);
  res.status(201).json(newDocs);
});

const getProducts: RequestHandler = wrap(async (req, res) => {
  const docs = await Product.find(filter(req.query), undefined, {
    skip: calculateSkipNumber(req.query.page as string),
    limit: single,
  });

  const total = await Product.find(filter(req.query)).countDocuments();

  res.status(200).json({ products: docs, total, single });
});

const getProduct: RequestHandler = wrap(async (req, res) => {
  const doc = await Product.findById(req.query.id);

  if (doc === null) {
    res.status(400).json({
      code: "product/:id",
      error: "No product found by id",
    });
  }

  res.status(200).json(doc);
});

export { addProduct, getProduct, getProducts };
