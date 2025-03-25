import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function RedirectToSchedule() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserGroup = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("group")
          .eq("id", user.id)
          .single();

        if (data?.group) {
          navigate(`/schedule/${data.group}`);
        } else {
          navigate("/error"); // Если у пользователя нет группы, направляем на ошибку
        }
      } else {
        navigate("/auth"); // Если пользователь не авторизован, отправляем на вход
      }
    };

    fetchUserGroup();
  }, [navigate]);

  return <div>Перенаправление...</div>;
}
