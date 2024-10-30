from typing import List
from cortado_core.negative_process_model_repair.trace_remover import (
    apply_sub_tree_rating_based_negative_process_model_repair,
    apply_complete_brute_force_based_negative_process_model_repair,
    apply_heuristic_brute_force_based_negative_process_model_repair,
)
from cortado_core.utils.trace import TypedTrace

from pm4py.objects.process_tree.obj import ProcessTree

from src.backend.backend_utilities.process_tree_conversion import dict_to_process_tree, process_tree_to_dict


def remove_variant_from_process_model_complete_brute_force(
    pt_dict: dict, negative_variant: List[any], positive_variants: List[any]
):
    pt: ProcessTree
    frozen_subtrees: List[ProcessTree]
    pt, frozen_subtrees = dict_to_process_tree(pt_dict)

    (
        tree_updated,
        resulting_tree,
        approach_used,
        percentage_positive_variants_conforming,
        resulting_tree_edit_distance,
        applied_rules,
        failed_updates,
        update_operations
    ) = apply_complete_brute_force_based_negative_process_model_repair(pt, negative_variant, positive_variants)
    if tree_updated:
        res = process_tree_to_dict(resulting_tree)
    else:
        res = pt_dict

    return res

def remove_variant_from_process_model_heuristic_brute_force(
    pt_dict: dict, negative_variant: List[any], positive_variants: List[any]
):
    pt: ProcessTree
    frozen_subtrees: List[ProcessTree]
    pt, frozen_subtrees = dict_to_process_tree(pt_dict)

    (
        tree_updated,
        resulting_tree,
        approach_used,
        percentage_positive_variants_conforming,
        resulting_tree_edit_distance,
        applied_rules,
        failed_updates,
        update_operations
    ) = apply_heuristic_brute_force_based_negative_process_model_repair(pt, negative_variant, positive_variants)
    if tree_updated:
        res = process_tree_to_dict(resulting_tree)
    else:
        res = pt_dict

    return res

def remove_variant_from_process_model_sub_tree_rating(
    pt_dict: dict, negative_variant: List[any], positive_variants: List[any]
):
    pt: ProcessTree
    frozen_subtrees: List[ProcessTree]
    pt, frozen_subtrees = dict_to_process_tree(pt_dict)

    (
        tree_updated,
        resulting_tree,
        approach_used,
        percentage_positive_variants_conforming,
        resulting_tree_edit_distance,
        applied_rules,
        failed_updates,
        update_operations
    ) = apply_sub_tree_rating_based_negative_process_model_repair(pt, negative_variant, positive_variants)
    if tree_updated:
        res = process_tree_to_dict(resulting_tree)
    else:
        res = pt_dict

    return res
