# Portfolio V5  
Hello everyone!  
Let me introduce myself, I’m Eki Zulfar Rachman. On this occasion, I’d like to share the portfolio website project that I’ve developed.  

**Tech Stack used:**
- ReactJS
- Tailwind CSS
- AOS
- Framer Motion
- Lucide
- Material UI
- SweetAlert2

**Website Link:**  
[https://www.eki.my.id/](https://www.eki.my.id/)  

We would appreciate it if you decide to use this project. Please include credit when using it. Thank you! 🙏  

---

# Tutorial: Running the Project  

Here’s a simple guide to run this project.  

## Prerequisites  

Ensure that you have already installed:  
- **Node.js**  

---

## Steps to Run the Project  

1. **Download this project:**  

   ```bash  
   git clone https://github.com/EkiZR/Portofolio_V5.git  
   ```  

2. **Install all dependencies:**  

   ```bash  
   npm install  
   ```  
   Or use:  

   ```bash  
   npm install --legacy-peer-deps  
   ```  

3. **Run the project:**  

   ```bash  
   npm run dev  
   ```  

4. **Open in browser:**  

   Access the application through the link displayed in your terminal.  

---

## Creating a Production Build  

To create a production-ready build:  

1. Run the build command:  

   ```bash  
   npm run build  
   ```  

2. The build files will be saved in the `dist` folder. You can upload this folder to your hosting server.  

---

## Notes  

If you encounter issues while running the project, ensure that:  
- Node.js is correctly installed.  
- You’re in the correct project directory.  
- All dependencies are installed without errors.  

---

## Local Data Configuration

This project now uses local JSON files for data storage instead of Firebase. The data is stored in:
- `src/data/projects.json` - Project information
- `src/data/certificates.json` - Certificate information

Comments are stored in localStorage for persistence.

