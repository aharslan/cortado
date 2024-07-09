from typing import List, Any

from backend_utilities.process_tree_conversion import (
    dict_to_process_tree,
    process_tree_to_dict,
)
from cortado_core.freezing.reinsert_frozen_subtrees import post_process_tree
from fastapi import APIRouter
from pydantic import BaseModel
from src.backend.endpoints.remove_variant_from_process_model import (
    remove_variant_from_process_model,
)

router = APIRouter(tags=["modifyTree"], prefix="/modifyTree")


class ReduceData(BaseModel):
    pt: dict


@router.post("/applyReductionRulesToTree")
async def applyTreeReductionRules(d: ReduceData):
    pt, frozen_subtrees = dict_to_process_tree(d.pt)
    return process_tree_to_dict(post_process_tree(pt, frozen_subtrees), frozen_subtrees)


class InputRemoveSelectedVariantFromModel(BaseModel):
    negative_variant: List[Any]
    positive_variants: List[Any]
    pt: dict


@router.post("/removeSelectedVariantFromModel")
async def remove_selected_variant_from_model(d: InputRemoveSelectedVariantFromModel):
    return remove_variant_from_process_model(
        d.pt, d.negative_variant, d.positive_variants
    )
