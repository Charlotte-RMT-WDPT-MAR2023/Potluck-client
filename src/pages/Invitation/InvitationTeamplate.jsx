import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar";
import templatesService from "../../services/templates.service";

function InvitationTemplate() {
  const [templates, setTemplates] = useState([]);
  const [inputText, setInputText] = useState("");

  const getAllTemplates = () => {
    templatesService
      .getAllTemplates()
      .then((response) => setTemplates(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  const filteredTemplates = templates.filter((template) => {
    return template.templateTags.toLowerCase().includes(inputText.toLowerCase());
  });

  return (
    <div>
      <Searchbar inputText={inputText} setInputText={setInputText} />
      <div className="tileContainer">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="templateTile">
            <img src={template.imageUrl} alt={template.templateName} />
            <h3>{template.templateName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvitationTemplate;
