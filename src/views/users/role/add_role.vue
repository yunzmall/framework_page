<template>
  <role-detail :is-edit="false" />
</template>

<script>
import RoleDetail from "../components/role_details";

export default {
  name: "AddUser",
  components: { RoleDetail }
};
</script>
