const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Recipe = require('../models/Recipe');
const verifyToken = require('../middleware/verifyToken');



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});



// ✅ POST /generate (Try OpenAI → Fallback to Cohere)
router.post('/generate', async (req, res) => {
  const { ingredients } = req.body;
  const prompt = `Suggest a unique recipe using only these ingredients: ${ingredients.join(', ')}. Include a catchy recipe title and detailed step-by-step instructions.`;

  try {
    // 🧠 Try OpenAI
   const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: prompt }], // ✅ Correct key is `messages`
  temperature: 0.7,
  max_tokens: 400,
});


    const aiContent = response.choices[0].message.content;
    const [titleLine, ...rest] = aiContent.split('\n');
    const title = titleLine.replace(/^Recipe Title:?\s*/i, '').trim();
    const content = rest.join('\n').trim();

    return res.json({ title, content });
  } catch (error) {
    console.warn('OpenAI failed:', error.response?.data || error.message);

try {
  const response = await cohere.generate({
    model: 'command',
    prompt,
    max_tokens: 400,
    temperature: 0.8
  });

  const output = response.body.generations[0].text;
  const [titleLine, ...rest] = output.split('\n');
  const title = titleLine.replace(/^Recipe Title:?\s*/i, '').trim();const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Recipe = require('../models/Recipe');
const verifyToken = require('../middleware/verifyToken');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// ✅ POST /generate (Try OpenAI → Fallback to Cohere)
router.post('/generate', async (req, res) => {
  const { ingredients } = req.body;
  const prompt = `Suggest a unique recipe using only these ingredients: ${ingredients.join(', ')}. Include a catchy recipe title and detailed step-by-step instructions.`;

  try {
    // 🧠 Try OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 400,
    });

    const aiContent = response.choices[0].message.content;
    const [titleLine, ...rest] = aiContent.split('\n');
    const title = titleLine.replace(/^Recipe Title:?\s*/i, '').trim();
    const content = rest.join('\n').trim();

    return res.json({ title, content });
  } catch (error) {
    console.warn('OpenAI failed:', error.response?.data || error.message);

    // ✅ Fallback to Cohere.chat()
    try {
      const chatResponse = await cohere.chat({
        model: "command",
        message: prompt,
        temperature: 0.8,
        max_tokens: 400,
      });

      const output = chatResponse.text;
      const [titleLine, ...rest] = output.split('\n');
      const title = titleLine.replace(/^Recipe Title:?\s*/i, '').trim();
      const content = rest.join('\n').trim();

      return res.json({ title, content });
    } catch (fallbackError) {
      console.error("Cohere failed too:", fallbackError.message);
      return res.status(500).json({ error: "Both AI models failed. Please try again later." });
    }
  }
});

// ✅ POST /save
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { title, content, ingredients } = req.body;
    const recipe = new Recipe({
      title,
      content,
      ingredients,
      userId: req.user.id
    });

    await recipe.save();
    res.status(201).json({ message: 'Recipe saved successfully!' });
  } catch (error) {
    console.error('Save error:', error.message);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

// ✅ GET /saved
router.get('/saved', verifyToken, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;

  const content = rest.join('\n').trim();

  return res.json({ title, content });
} catch (fallbackError) {
  console.error("Cohere failed too:", fallbackError.message);
  return res.status(500).json({ error: "Both AI models failed. Please try again later." });
}


  }
});

// ✅ POST /save
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { title, content, ingredients } = req.body;
    const recipe = new Recipe({
      title,
      content,
      ingredients,
      userId: req.user.id   // ✅ From decoded JWT
    });

    await recipe.save();
    res.status(201).json({ message: 'Recipe saved successfully!' });
  } catch (error) {
    console.error('Save error:', error.message);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

// ✅ GET /saved
router.get('/saved', verifyToken, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});


module.exports = router;
