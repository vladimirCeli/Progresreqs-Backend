const Requirement = require("../model/Requirements.model");
const { Op } = require("sequelize");

const getAllRequirements = async (req, res, next) => {
  try {
    const requirements = await Requirement.findAll();
    res.json(requirements);
  } catch (error) {
    next(error);
  }
};

const getRequirementByProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirements = await Requirement.findAll({
      where: { project_id: id, req_no_funtional: { [Op.not]: null }, characteristicsr: { [Op.not]: null } },
    });
    if (requirements.length === 0) {
      return res.status(404).json({ message: "No existen requisitos funcionales para este proyecto" });
    }
    res.status(200).json(requirements);
  } catch (error) {
    next(error);
  }
};

const getRequirementNotFunctionalByProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirements = await Requirement.findAll({
      where: { project_id: id, req_no_funtional: null, characteristicsr: null },
    });
    if (requirements.length === 0) {
      return res.status(404).json({ message: "No existen requisitos no funcionales para este proyecto" });
    }
    res.status(200).json(requirements);
  } catch (error) {
    next(error);
  }
};

const checkRequirementNoFuntional = async (req, res, next) => {
  const { id } = req.params;
  const requirement = await Requirement.findByPk(id);
  if (!requirement) {
    return res.status(404).json({ message: "No existe el requerimiento" });
  }

  if (requirement.req_no_funtional === null) {
    const isNotFuntional = true;
    return res.status(200).json({ isNotFuntional });
  } else {
    const isNotFuntional = false;
    return res.status(200).json({ isNotFuntional });
  }
};

const getNumberRequirements = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirements = await Requirement.findAll({
      where: { project_id: id },
    });

    var numberRequirements = 0;
    var numberRequirementsNotFunctional = 0;
    if (!requirements) {
      return res.status(404).json({
        numberRequirements,
        numberRequirementsNotFunctional,
      });
    }
    for (let i = 0; i < requirements.length; i++) {
      if (requirements[i].req_no_funtional === null) {
        numberRequirementsNotFunctional++;
      } else {
        numberRequirements++;
      }
    }

    res.status(200).json({ numberRequirements, numberRequirementsNotFunctional });
  } catch (error) {
    next(error);
  }
};

const getRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }
    res.json(requirement);
  } catch (error) {
    next(error);
  }
};

const createRequirement = async (req, res, next) => {
  const {
    ident_requirement_id,
    name,
    characteristicsr,
    description,
    req_no_funtional,
    priority_req,
    project_id,
  } = req.body;

  try {
    const requirement = await Requirement.create({
      ident_requirement_id,
      name,
      characteristicsr,
      description,
      req_no_funtional,
      priority_req,
      project_id,
    });
    res.status(200).json({requirement, message: "Requerimiento creado correctamente"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar si el requisito existe antes de intentar eliminarlo
    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }

    const result = await Requirement.destroy({
      where: { id },
    });
    if (result === 0) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }
    res.status(200).json({ message: "Requerimiento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      ident_requirement_id,
      name,
      characteristicsr,
      description,
      req_no_funtional,
      priority_req,
      project_id,
    } = req.body;

    const [, updatedRequirement] = await Requirement.update(
      {
        ident_requirement_id,
        name,
        characteristicsr,
        description,
        req_no_funtional,
        priority_req,
        project_id,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }
    res.status(200).json({ message: "Requerimiento actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRequirements,
  getRequirement,
  checkRequirementNoFuntional,
  getNumberRequirements,
  createRequirement,
  deleteRequirement,
  updateRequirement,
  getRequirementByProject,
  getRequirementNotFunctionalByProject
};
